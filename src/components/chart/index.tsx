import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

import type { ReactElement } from 'react';
import type { Interpolation, Theme } from '@emotion/react';

type Config = Parameters<typeof mermaid.initialize>[0];

export interface ChartProps {
  readonly code: string;
  readonly className?: string;
  readonly style?: Interpolation<Theme>;
  readonly config?: Omit<Config, 'startOnLoad'>;
}

export default function Chart({ code, className = '', style = {}, config = {}}: ChartProps): ReactElement<ChartProps> | null {
  useEffect(() => {
    mermaid.initialize(config);
  }, [config]);

  const canvas = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      if (code.length > 0) {
        mermaid.render('graph', code, (svg: string) => {
          if (canvas !== null && canvas.current !== null) {
            canvas.current.innerHTML = svg;
          }
        });
      }
    } catch {}
  }, [code])

  return <div ref={canvas} id="canvas" className={className} css={style} />;
}
