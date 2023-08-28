## DataGuard Challenge - Plugin manager

This web application provides a simple way to manage plugins.

## Content

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installing dependencies](#installing-dependencies)
- [Running the application](#running-the-application)
- [Running tests](#running-tests)

## Overview

This application is written using [Next.JS](https://nextjs.org/) and [Typescript](https://www.typescriptlang.org/). It uses [CSS Modules](https://github.com/css-modules/css-modules) for styling
The following are the key component and files included in the application:

- `src/components` directory: contains the components that make up the application
- `src/providers` directory: contains the context providers that make it easy to share functionality across the application

## Prerequisites

This application depends on [Node.JS](https://nodejs.org) 16 so please ensure that you have it installed on your machine.

## Installing Dependencies

To ensure that the application runs correctly, you have to make sure all dependencies are correctly installed. This can be done by running the following command:

```bash
# yarn
yarn install

# or npm
npm install
```

## Running the Application

Once all dependencies are installed, you should be able to run the application. The application can be started in development mode using:

```bash
# yarn
yarn dev

# or npm
npm run dev
```

To start the application in production mode, you can run:

```bash
# yarn
yarn start

# or npm
npm start
```
