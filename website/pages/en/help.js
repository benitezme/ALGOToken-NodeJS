/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function Help(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const supportLinks = [
    {
      content: `Find a smart contract problem or vulnerability to report? Create an issue in the main [AlgoToken repo](https://github.com/Superalgos/ALGOToken/issues
      )`,
      title: 'Find Issues?',
    },
    {
      content: 'Want to contribute to the documentation or the testing of ALGO smart contracts? Visit the [Explore Algo Smart Contracts repo](https://github.com/Superalgos/ALGOToken-NodeJS)',
      title: 'Contribute!',
    },
    {
      content: 'Find out more about the project using these smart contracts: [The Superalgos Project](https://superalgos.org)',
      title: 'The Superalgos Project',
    },
  ];

  return (
    <div className="docMainWrapper wrapper">
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Need help?</h1>
          </header>
          <p>This documentation is maintained by the core team of the Superalgos project.</p>
          <GridBlock contents={supportLinks} layout="threeColumn" />
        </div>
      </Container>
    </div>
  );
}

module.exports = Help;
