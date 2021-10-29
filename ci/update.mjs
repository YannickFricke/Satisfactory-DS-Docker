import execa from 'execa';
import fetch from 'node-fetch';

const previousPublishedBuild = process.env.PREVIOUS_TAG;
const dockerToken = process.env.DOCKER_TOKEN;
const imageName = 'yfricke/satisfactory-server';

function setup() {
    if (!process.env.DOCKER_TOKEN) {
        throw new Error('DOCKER_TOKEN environment variable is not set');
    }

    if (!process.env.PREVIOUS_TAG) {
        throw new Error('PREVIOUS_TAG environment variable is not set');
    }

    const loginResult = execa.sync('docker', ['login', '-u', `yfricke`, '-p', dockerToken], {
        all: true,
        stdio: 'inherit'
    });

    if (loginResult.failed) {
        throw new Error(`Failed to login to Docker hub: ${loginResult.all}`);
    }

    execa.sync('git', ['config', '--global', 'user.email', 'yannickfricke@googlemail.com']);
    execa.sync('git', ['config', '--global', 'user.name', 'YannickFricke']);
}

function buildImage() {
    console.log(`Building new docker image!`);

    const buildResult = execa.sync('docker', ['build', '-t', `${imageName}:latest`, '.'], {
        all: true,
        stdio: 'inherit'
    });

    if (buildResult.failed) {
        throw new Error(`Failed to build docker image: ${buildResult.all}`);
    }

    console.log('Docker image built successfully');
}

function createTags(latestBuildId) {
    const dockerTagResult = execa.sync('docker', ['image', 'tag', `${imageName}:latest`, `${imageName}:${latestBuildId}`], {
        all: true,
        stdio: 'inherit'
    });

    if (dockerTagResult.failed) {
        throw new Error(`Failed to tag docker image: ${dockerTagResult.all}`);
    }

    const gitTagResult = execa.sync('git', ['tag', `-a`, latestBuildId, '-m', `"Updated to build version ${latestBuildId}"`], {
        all: true,
        stdio: 'inherit'
    });

    if (gitTagResult.failed) {
        throw new Error(`Failed to create git tag ${latestBuildId}: ${gitTagResult.all}`);
    }
}

function push() {
    const dockerPushResult = execa.sync('docker', ['image', 'push', '--all-tags', imageName], {
        all: true,
        stdio: 'inherit'
    });

    if (dockerPushResult.failed) {
        throw new Error(`Failed to push docker image: ${dockerPushResult.all}`);
    }

    const gitPushResult = execa.sync('git', ['push', 'origin', '--tags'], {
        all: true,
        stdio: 'inherit'
    });

    if (gitPushResult.failed) {
        throw new Error(`Failed to push GIT tag ${latestBuildId}: ${gitPushResult.all}`);
    }
}

async function checkForUpdates() {
    try {
        setup();
        const latestBuildId = await getLatestBuildId();

        if (previousPublishedBuild === latestBuildId) {
            console.log('No updates available');
            return;
        }

        console.log(`New build available: ${latestBuildId}`);

        buildImage();
        createTags(latestBuildId);
        push();
    } catch (error) {
        console.error(`Unhandled script error: ${error}`);
        process.exit(1);
    }
}

function getLatestBuildId() {
    return fetch('https://api.steamcmd.net/v1/info/1690800')
        .then(res => res.json())
        .then(json => {
            if (json.status !== 'success') {
                throw new Error('Failed to get latest build id: Could not fetch information from SteamCMD API');
            } else {
                const steamData = json.data['1690800'];
                const branchData = steamData.depots.branches;
                const latestBuildId = branchData.public.buildid;

                return latestBuildId;
            }
        });
}

checkForUpdates();
