import styled, {css} from 'styled-components';

export const Color = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 50%;
    border: 2px solid transparent;
    
    ${({color}) => color && css`border-color: ${color};`}
    ${({color, active}) => color && active && css`background-color: ${color};`}
`;
