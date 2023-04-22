ARG VARIANT="18-bullseye"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:0-${VARIANT}

RUN sudo apt-get install unzip \
    && curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && sudo ./aws/install

# install amplify cli
RUN su node -c "yarn global add @aws-amplify/cli@11.0.5"