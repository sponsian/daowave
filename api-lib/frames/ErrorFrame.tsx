import React from 'react';

import { OGAvatar } from '../../_api/og/OGAvatar.tsx';

import { getViewerFromParams } from './_getViewerFromParams.ts';
import { staticResourceIdentifier } from './_staticResourceIdentifier.ts';
import { Frame } from './frames.ts';
import { PartyHelpFrame } from './giveparty/PartyHelpFrame.tsx';
import {
  FrameBgImage,
  IMAGE_URL_BASE,
} from './layoutFragments/FrameBgImage.tsx';
import { FrameBody } from './layoutFragments/FrameBody.tsx';
import { FrameBodyGradient } from './layoutFragments/FrameBodyGradient.tsx';
import { FrameFooter } from './layoutFragments/FrameFooter.tsx';
import { FrameHeadline } from './layoutFragments/FrameHeadline.tsx';
import { FrameWrapper } from './layoutFragments/FrameWrapper.tsx';
import { TRY_GIVEBOT_INTENT } from './routingUrls.ts';

export const ErrorFrameImage = async (params: Record<string, string>) => {
  const { viewerProfile } = await getViewerFromParams(params);
  const { error_message } = params;

  return (
    <FrameWrapper>
      <FrameBgImage src="error.jpg" />
      <FrameBody>
        <FrameBodyGradient
          gradientStyles={{
            background:
              'radial-gradient(circle at 25% 0%, #12FAA6 0%, #E71392 80%)',
            opacity: 0.7,
          }}
        />
        <FrameHeadline>
          <OGAvatar avatar={viewerProfile?.avatar} />
          <div tw="flex items-center grow justify-center">Error</div>
          <img
            alt="gem"
            src={IMAGE_URL_BASE + 'GemWhite.png'}
            style={{ width: 80, height: 80 }}
          />
        </FrameHeadline>
        <FrameFooter>{error_message && `${error_message}`}</FrameFooter>
      </FrameBody>
    </FrameWrapper>
  );
};

export const ErrorFrame = (message?: string): Frame => ({
  id: 'error_frame',
  homeFrame: false,
  imageNode: ErrorFrameImage,
  errorMessage: message,
  resourceIdentifier: staticResourceIdentifier,
  buttons: [
    {
      title: 'How 2 Party?',
      action: 'post',
      onPost: async () => PartyHelpFrame(),
    },
    {
      title: 'Try @givebot',
      action: 'link',
      target: TRY_GIVEBOT_INTENT,
    },
  ],
});
