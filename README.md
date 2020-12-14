<h1 align='center'>File System Persistence Adapter</h1>
<p align='center'>
An implementation of the Alexa Persistence Adapter using the file system
</p>
<p align='center'>
    <a href="https://www.npmjs.com/package/fs-persistence-adapter"><img src="https://img.shields.io/npm/v/fs-persistence-adapter.svg" alt="module version"></a>&nbsp;
    <a href="https://github.com/ECRomaneli/fs-persistence-adapter/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="GitHub license"></a>&nbsp;
    <a href="https://github.com/ECRomaneli/fs-persistence-adapter"><img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="contributions welcome"></a>
</p>

## What is Alexa

Alexa is Amazon’s cloud-based voice service (...). You can build natural voice experiences that offer customers a more intuitive way to interact with the technology they use every day (...).

## What is a Skill

In this context, a `Skill` is the name assigned to an application designed to enhance Alexa's functionalities.

Learn more about Skills on [Alexa Skills Kit](https://developer.amazon.com/en-US/alexa/alexa-skills-kit/start).

## File System Persistence Adapter

The File System Persistence Adapter implements the ASK Core interface with the same name and provides a bridge between the FileSystem node.js library and the Alexa Persistence Attributes.

## Install

When you creating your skill, just import `fs-persistence-adapter` into your `package.json`, or alternatively run:

```bash
    npm i fs-persistence-adapter
```

and import into your project using one of two options bellow:

```javascript
    const { FSPersistenceAdapter } = require('fs-persistence-adapter');

    ...Alexa.SkillBuilders.custom().withPersistenceAdapter(
        new FSPersistenceAdapter('path/to/file') // to save all attributes of all users in a single file
        /* OR */
        new FSPersistenceAdapter('path/') // to save attributes in files separated by user id
    )
```

    NOTE: The path needs to already exists, only the files are created.

## Author

- Created and maintained by [Emerson C. Romaneli](https://github.com/ECRomaneli) (@ECRomaneli).

## License

[Under MIT License](https://github.com/ECRomaneli/true-skill/blob/master/LICENSE)