import { filter } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useContext, useEffect, useState, VFC } from "react";
import { DiagnosticCategory } from "typescript";
import { AllQuizContext } from "../providers/QuizProvider";
import { SelUserContext } from "../providers/UserProvider";
import { UserInfo } from "../types/api/userinfo";
import { useMessage } from "./useMessage";

type Props = {
  subject: string;
  start_page: number;
  end_page: number;
  category: string;
};

type Props2 = {
  newUser: UserInfo;
};

export const useUser = () => {
  const [userArray, setUserArray] = useState<Array<UserInfo>>([
    { _id: "TTTTT", name: "dummy", pass: "dummy" },
  ]);

  const { selectedUser, setSelectedUser } = useContext(SelUserContext);

  const server_url = process.env.REACT_APP_SERVER_URL;
  const server_port = process.env.REACT_APP_SERVER_PORT;

  const patchUser = (props2: Props2) => {
    console.log("patchUser was called.");

    let { newUser } = props2;
    const id = newUser._id;
    let user_url = `http://${server_url}:${server_port}/user`;

    axios
      .patch<Array<UserInfo>>(user_url, newUser, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("Success to update :" + id);
      })
      .catch(function (error) {
        console.log("ERROR?");
        console.log(error.config);
        for (let key of Object.keys(error)) {
          console.log(key);
          console.log(error[key]);
        }
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
  };

  type Props3 = {
    subject: string;
  };

  const updateDB = (props3: Props3) => {
    console.log("updateDB was called.");

    let { subject } = props3;
    userArray.map((eachUser) => {
      const id = eachUser._id;
      patchUser({ newUser: eachUser });
    });
  };

  const useUsers = () => {
    const { showMessage } = useMessage();
    console.log("useUsers was called.");
    let user_url = `http://${server_url}:${server_port}/user`;
    console.log(user_url);

    useEffect(() => {
      axios
        .get<Array<UserInfo>>(user_url, {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setUserArray(res.data);
          console.log(userArray);
        })
        .catch(function (error) {
          console.log("ERROR?");
          console.log(error.config);
          console.log(error);
          for (let key of Object.keys(error)) {
            console.log(key);
            console.log(error[key]);
          }
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }, []);
  };

  return {
    selectedUser,
    userArray,
    useUsers,
    setUserArray,
    patchUser,
    updateDB,
  };
};
