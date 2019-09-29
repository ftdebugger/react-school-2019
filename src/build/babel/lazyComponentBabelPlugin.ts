import { NodePath, PluginObj } from '@babel/core';

import template from '@babel/template';
import * as t from '@babel/types';

export default function lazyComponentBabelPlugin(): PluginObj {
    return {
        visitor: {
            CallExpression({ node }: NodePath<t.CallExpression>) {
                if (!t.isIdentifier(node.callee) || node.callee.name !== 'lazyComponentBabel') {
                    return;
                }

                let arrow = node.arguments[0];

                if (!t.isArrowFunctionExpression(arrow)) {
                    return;
                }
                let body = arrow.body;

                if (!t.isCallExpression(body) || !t.isImport(body.callee)) {
                    return;
                }

                let options = template.expression`{
                    asyncLoader() {
                        if (typeof window === 'object') {
                            return IMPORT;
                        }
                    },
                    syncLoader() {
                        if (typeof window === 'undefined') {
                            return require(PATH);
                        }
                    },
                    id: require.resolveWeak(PATH),
                }`;

                node.arguments[0] = options({
                    IMPORT: body,
                    PATH: body.arguments[0],
                });
            },
        },
    };
}

export const LAZY_COMPONENT_PLUGIN = require.resolve(__filename);
