# Use Ubuntu 20.04 as base image
FROM ubuntu:20.04

LABEL org.opencontainers.image.authors="Yannick Fricke"

# Install required system packages
RUN apt-get update && apt-get upgrade -y && apt-get install -y curl software-properties-common && rm -rf /var/lib/apt/lists/*

# Add support for the 32bit architecture
RUN add-apt-repository multiverse && dpkg --add-architecture i386

# Install required SteamCMD dependencies
RUN apt-get update && apt-get upgrade -y && apt-get install -y lib32gcc1 && rm -rf /var/lib/apt/lists/*

# Add an unprivileged user
# Running things in Docker as root is a security risk and should be avoided
RUN useradd -ms /bin/bash steam

# Switch to the new user
USER steam

# Switch to the HOME directory of the new user
WORKDIR /home/steam

# Create the "Steam" subdirectory
RUN mkdir -p Steam

# Switch to the new directory
WORKDIR /home/steam/Steam

# Download SteamCMD and extract it
RUN curl -sqL "https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz" | tar zxvf -

# Install the Satisfactory dedicated server
RUN /home/steam/Steam/steamcmd.sh +force_install_dir SatisfactoryDedicatedServer +login anonymous +app_update 1690800 +quit

# Set the entrypoint to the dedicated server start script
ENTRYPOINT [ "/home/steam/Steam/SatisfactoryDedicatedServer/FactoryServer.sh" ]

# for documentation purposes
EXPOSE 15777/udp
EXPOSE 15000/udp
EXPOSE 7777/udp
