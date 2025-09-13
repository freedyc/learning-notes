import { css } from '@emotion/react';
import styled from '@emotion/styled'


const Input = styled.input`
    border: 1px solid #000;
    height: 32px;
    width: 300px;
    padding-left: 10px;
`

const style = css`
    color: blue;
    font-size: 12px;
`

const EmotionCSS = () => {
  return (
    <div>
      <h1 css={style}> CSS</h1>
      <Input type="text" placeholder="Input" />
    </div>
  );
};


export default EmotionCSS;