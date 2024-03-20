import React, { useState } from 'react';
import styled from 'styled-components';

// TODO: More styling options
// TODO: non styled-components dependant
interface ToolTipProps {
    children: React.ReactNode;
    hoverChildren: Array<React.ReactNode>;
    containerStyling: {
        display?: string;
    }
    toolTipStyling: {
        yOffset?: string;
    }
}

export default function ToolTip({ 
    children, 
    hoverChildren, 
    containerStyling, 
    toolTipStyling }: ToolTipProps
) {
    const [hover, setHover] = useState(false);
    const items = (
        <ToolTipBox styling={toolTipStyling}>
            { hoverChildren.map(child => child)}
        </ToolTipBox>
    );

    return (
        <Container
            styling={containerStyling}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <>{children}</>
            { hover ? items : null }
        </Container>
    );
}

const Container = styled.div`
    display: ${props => props?.styling?.display ? props?.styling.display : 'flex'};
    position: relative;
`;

const ToolTipBox = styled.div`
    position: absolute;
    top: calc(100% + ${props => props?.styling?.display ? props.styling.display : '10px'});
`;

/* @ToolTip
 * - Wraps any amount of children, on mouse hover displays sub children as a tooltip
 *
 * usage:
 * function myComponent() {
 *  return (<>
 *      <ToolTip 
 *          hoverChildren={[<MyOtherComponent>Some text</MyOtherComponent>]}
 *          containerStyling={...}
 *          toolTipStyling={...}>
 *          <img src="..." />
 *      </ToolTip>
 *  </>);  
 * }
 */
