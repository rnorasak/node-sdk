/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import extend = require('extend');
import { getMissingParams } from '../lib/helper';
import GeneratedToneAnalyzerV3 = require('./v3-generated');

class ToneAnalyzerV3 extends GeneratedToneAnalyzerV3 {
  constructor(options) {
    // For backward compatibility, allow version to be passed in version_date.
    const _options = extend({}, options);
    _options.version = _options.version_date || _options.version;
    super(_options);
  }

  tone(params, callback) {
    if (params && params.tone_input) {
      return super.tone(params, callback);
    }

    const missingParams = getMissingParams(params, ['text']);
    if (missingParams) { return callback(missingParams); }

    const _params: GeneratedToneAnalyzerV3.ToneParams = {
      tone_input: params.text,
      content_type: params.isHTML ? 'text/html' : 'text/plain'
    };

    if (params.tones) { _params.tones = params.tones.split(','); }
    if (params.sentences) { _params.sentences = params.sentences; }
    if (params.language) { _params.content_language = params.language; }

    return super.tone(_params, callback);
  }

  tone_chat(params, callback) {
    const missingParams = getMissingParams(params, ['utterances']);
    if (missingParams) { return callback(missingParams); }

    const _params = extend({}, params);
    if (params.utterances.utterances) {
        _params.utterances = params.utterances.utterances;
    }
    return super.toneChat(_params, callback);
  }
}

export = ToneAnalyzerV3;
