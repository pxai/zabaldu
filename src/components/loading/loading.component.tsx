import { useState } from 'react';
import Image from 'next/image';
import { Loading, LoadingMessage } from './loading.styles';

const LoadingComponent = () => {
    return (
            <Loading>
                <LoadingMessage>
                    <Image src="/spin.png" width={70} height={70} alt="Loading" />
                </LoadingMessage>
            </Loading>
        )
};

export default LoadingComponent;