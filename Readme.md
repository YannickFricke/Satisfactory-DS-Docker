# Dockerized Satisfactory dedicated server

## About this repository

This repository contains everything to start a dockerized dedicated Satisfactory server.

### Do I really need a dedicated server now?

Definetly not! Satisfactory still has the "old" multiplayer mode which is probably less buggy than the dedicated servers.

### When do I need a dedicated server?

There are only three reasons why you need a dedicated server:

- You want to play with your friends and all of you have a bad internet connection
- Your computer can't handle a second player (due to old computer components)
- You wanna play in a local network where you don't have internet access

## Requirements

- [Docker](https://docs.docker.com/engine/install/)
- [docker-compose](https://docs.docker.com/compose/install/) (if you don't wanna use the Docker CLI directly)

## How to setup

Download the repository to your computer or server and run the following commands:

- docker-compose up

### Further ingame setup

Take a look at the awesome video of Jace (one of the Community Managers @ Coffee Stain Studios) how you set up the server ingame [here](https://youtu.be/Nn-1s87JJxc?t=490).

## Loading a savegame

The folks at Satisfactory wiki have a pretty neat guide on how you can upload the savegame to your server [here](https://satisfactory.fandom.com/wiki/Dedicated_servers#Loading_save_file).

Everything that you need to know regarding this Docker setup is, that you need to place the file in the `shared/SaveGames` directory. `docker-compose` will then mount the directory to the required location inside the container.

As far as I know there will be the possibility that you can upload your savegame directly to the server once it is implemented. Then you won't need the linked guide anymore.

## Known problems

- The dedicated server crashes when you use the `Rebar gun`. It has already been reported [here](https://questions.satisfactorygame.com/post/6178f324831c852052353029).
- The dedicated server crashes when you try to mass dismantle buildings. It has already been reported [here](https://questions.satisfactorygame.com/post/617877df831c852052352866).

Checkout the Satisfactory Q&A platform for the most recent information regarding server crashes and co [here](https://questions.satisfactorygame.com/search?search=Dedicated).

## How do I report bugs?

If you found a bug in the server / ingame you can report the bug directly to Coffee Stain Studios [here](https://questions.satisfactorygame.com/).

When it comes to the Docker support you can use the [issue tracker](https://github.com/YannickFricke/Satisfactory-DS-Docker/issues) of this repository.

## License

This repository is licensed under the MIT license. You can find the exact license in the `LICENSE` file.
