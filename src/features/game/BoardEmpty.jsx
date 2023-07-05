import React from 'react';
import Anime from '@mollycule/react-anime';
import { useContent } from '../../hooks';
import { createMarkup } from '../../utils';

const BoardEmpty = () => {
    const { empty_page } = useContent();

    return (
        <Anime
            in
            duration={800}
            appear
            onEntering={{
                opacity: [0, 1],
                translateY: [220, 0],
                easing: 'easeInOutSine',
            }}
        >
            <div className="empty-label text-markdown" dangerouslySetInnerHTML={createMarkup(empty_page)} />
        </Anime>
    );
};

export default BoardEmpty;
