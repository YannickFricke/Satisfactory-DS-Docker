# Dockerized Satisfactory dedicated server

## About this repository

This repository contains everything you need to start a dockerized dedicated Satisfactory server.

### Differences to other Satisfactory docker images

Some images on Docker hub are storing the server files in volumes or on the host filesystem. This is not a best practice in the Docker ecosystem as described [here](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#volume).

Volumes should ONLY be used for user specific configuration / files. The server files are not a part of it and should not be stored in volumes or on the host.

Imagine Coffee Stain Studios breaking the dedicated server software and you want to play with your friends. Other images would download and store the new server files in the volume. Now every time you start a new container it would read the broken server files and then crash, even if you reverted to an older image version.

It wouldn't even help to completely remove the local image due to the fact that these kind of images are using shell scripts to download and update the server files dynamically.

With this image this won't happen, due to the fact that the server files are stored as immutable data inside the container. Coffee Stain Studios broke the build? No problem! Just use the previous build id to run the old image and play with your friends!

### Do I really need a dedicated server now?

Definetly not! Satisfactory still has the "old" multiplayer mode (through sessions and invites) which is probably less buggy than the dedicated servers.

### When do I need a dedicated server?

There are only three reasons why you need a dedicated server:

- You want to play with your friends and all of you have a bad internet connection
- Your computer can't handle a second player (due to old computer components)
- You wanna play in a local network where you don't have internet access

## Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/) (if you don't wanna use the Docker CLI directly)

The minimum hardware requirements for running the dedicated server which are listed [here](https://satisfactory.fandom.com/wiki/Dedicated_servers#Minimum_requirements).

## How to setup

1. Download the repository to your computer or server and run the following command:

- docker-compose up

2. Make sure that the host directory that your [bind mount](https://docs.docker.com/storage/bind-mounts/) uses has the correct permissions for the container user. Because this image runs the server executable as the `steam` user, a bind mount might not be writable for the `steam` user. If you run into this issue run the following command from the base folder of the repository:

- `chown -R 1000:1000 /shared` 
 
### Further ingame setup

Take a look at the awesome video of Jace (one of the Community Managers @ Coffee Stain Studios) on how to set up the server ingame [here](https://youtu.be/Nn-1s87JJxc?t=490).

## Loading a savegame

The folks at Satisfactory wiki have a pretty neat guide on how you can upload the savegame to your server [here](https://satisfactory.fandom.com/wiki/Dedicated_servers#Loading_save_file).

Everything that you need to know regarding this Docker setup is, that you need to place the file in the `shared/SaveGames` directory. `docker-compose` will then mount the directory to the required location inside the container.

As far as I know you will be able to upload your savegame directly to the server from the game once it is implemented. Then you won't need the linked guide anymore.

## Known problems

- The dedicated server crashes when you use the `Rebar gun`. It has already been reported [here](https://questions.satisfactorygame.com/post/6178f324831c852052353029).
- The dedicated server crashes when you try to mass dismantle buildings. It has already been reported [here](https://questions.satisfactorygame.com/post/617877df831c852052352866).

Checkout the Satisfactory Q&A platform for the most recent information regarding server crashes and co [here](https://questions.satisfactorygame.com/search?search=Dedicated).

## How do I report bugs?

If you found a bug in the server / ingame you can report the bug directly to Coffee Stain Studios [here](https://questions.satisfactorygame.com/).

When it comes to the Docker support you can use the [issue tracker](https://github.com/YannickFricke/Satisfactory-DS-Docker/issues) of this repository.

## License

This repository is licensed under the MIT license. You can find the exact license in the `LICENSE` file.
