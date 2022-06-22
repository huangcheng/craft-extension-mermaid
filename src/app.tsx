import React, { useState, useEffect } from 'react';
import { Observable, interval } from 'rxjs';
import { map, switchMap, distinctUntilChanged } from 'rxjs/operators';

import type { FC, ReactElement } from 'react';
import type { CraftBlock, CraftCodeBlock } from '@craftdocs/craft-extension-api';

import { Chart } from 'components';

const selection$ = new Observable<CraftBlock[]>(subscriber => {
  void craft.editorApi.getSelection().then((result) => {
    if (result.status !== 'success') {
      throw new Error(result.message);
    }

    subscriber.next(result.data);

    subscriber.complete();
  })
});

const timer$ = interval(2000);

const App: FC = (): ReactElement => {
  const isDarkMode = useCraftDarkMode();

  const [code, setCode] = useState<string>('');

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const subscription$ = timer$.pipe(
      switchMap(() => selection$.pipe(
        distinctUntilChanged(),
        map<CraftBlock[], CraftCodeBlock[]>((blocks) => blocks.filter((block) => block.type === 'codeBlock') as CraftCodeBlock[]),
      )),
      map<CraftCodeBlock[], string[]>((blocks) => blocks.map((block) => block.code)),
      map<string[], string[]>((codes) => codes.map((code) => code.replace(/\\n/g, '\n')))
    ).subscribe((codes) => {
      const code = codes[0];

      if (code !== undefined) {
        setCode(code);
      }
    });

    return () => {
      subscription$.unsubscribe();
    }
  }, [setCode]);

  return <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }}>
    <Chart code={code} style={{ width: '100%', height: '100%' }} config={{ darkMode: isDarkMode }} />
  </div>;
}

function useCraftDarkMode() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    craft.env.setListener(env => setIsDarkMode(env.colorScheme === 'dark'));
  }, []);

  return isDarkMode;
}


export default App;
