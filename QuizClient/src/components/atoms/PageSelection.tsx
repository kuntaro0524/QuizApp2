import {
    Checkbox,
    filter,
    Flex,
    FormControl,
    FormLabel,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    RangeSlider,
    RangeSliderFilledTrack,
    RangeSliderThumb,
    RangeSliderTrack,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";

type Props = {
    onChangeStart: (event: ChangeEvent<HTMLInputElement>) => void;
    onChangeEnd: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const PageSelection = () => {
    // const { onChangeStart, onChangeEnd } = props;
    const [thresh, setThresh] = useState(0);

    return <>
        <Flex>
            <Text>
                From
            </Text>
            <NumberInput width={'150px'}
                value={"unchi"} defaultValue={1} min={1} max={600} >
                <NumberInputField />
            </NumberInput>
            <Text>
                To
            </Text>
            <NumberInput width={'150px'} value={"unko"} defaultValue={100} min={1} max={600} >
                <NumberInputField />
            </NumberInput>
        </Flex>
    </>
}