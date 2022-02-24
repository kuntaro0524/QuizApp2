import { AspectRatio, AspectRatioProps, Box, Image } from "@chakra-ui/react";
import React from "react";

type Props = {
  isCorrect: boolean;
  isAnswered: boolean;
};

export const useMyImage = () => {
  const displayJudgeImage = (props: Props) => {
    const { isCorrect, isAnswered } = props;
    console.log("Current " + isCorrect);

    let judge_comment = "";

    const lose_img =
      "https://pbs.twimg.com/media/DF-5ziRUIAAGtWL?format=jpg&name=large";
    const win_img =
      "https://cdn-ak.f.st-hatena.com/images/fotolife/v/velociraptorRe01/20170723/20170723224813.jpg";
    const judge_img =
      "https://ga-m.com/image/news/2017/04/05/splatoon2-cojudd-kodomo-huku-3.jpg";

    let imgpath = null;
    if (!isAnswered) {
      imgpath = judge_img;
      judge_comment = "入力中";
    } else if (isCorrect) {
      imgpath = win_img;
      judge_comment = "正解";
    } else {
      imgpath = lose_img;
      judge_comment = "不正解";
    }

    return (
      <Box w={500} m={3}>
        {judge_comment}
        <AspectRatio maxW="300px" ratio={5 / 3}>
          <Image src={imgpath} alt="judgement" objectFit="cover" />
        </AspectRatio>
      </Box>
    );
  };

  return { displayJudgeImage };
};
