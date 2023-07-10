// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import { nodeBelongs } from '../../../../lib/components/internal/utils/node-belongs';

describe('nodeBelongs', () => {
  test('returns "true", when the node and the container are the same element', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div id="container1"></div>
    `;
    expect(nodeBelongs(div.querySelector('#container1'), div.querySelector('#container1') as Node)).toBe(true);
  });

  test('returns "true", when the node is descendant from the container', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div id="container1">
        <div id="node"></div>
      </div>
    `;
    expect(nodeBelongs(div.querySelector('#container1'), div.querySelector('#node') as Node)).toBe(true);
  });

  test('returns "false", when the node is not a child of the container', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div id="container1"></div>
      <div id="node"></div>
    `;
    expect(nodeBelongs(div.querySelector('#container1'), div.querySelector('#node') as Node)).toBe(false);
  });

  test('returns "true" when node belongs to a portal issued from within the container', () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div id="container1">
        <div id="node"></div>
      </div>
      <div data-awsui-referrer-id="node"></div>
    `;
    expect(nodeBelongs(div.querySelector('#container1'), div.querySelector('#node') as Node)).toBe(true);
  });
});