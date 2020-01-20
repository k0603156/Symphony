const Router = require("express").Router();
const { user: UserModel } = require("../Models/tables");
const { NotFoundError } = require("../Utils/Error");
const { generateRandomString, encryptString, checkProps } = require("../Utils");
const ENCRYPT_BUFF = 64;
const ENCODE_TYPE = "base64";

//Todo:수정필요
Router.get("/", async (req, res, next) => {
  res.status(200).json({ data: "user" });
});

Router.get("/:userName", async (req, res, next) => {
  try {
    const exUser = await UserModel.findOne({
      where: { userName: req.params.userName },
      attributes: ["userName"]
    });
    if (!exUser) {
      throw new NotFoundError("해당 사용자를 찾을 수 없습니다.");
    }
    res.status(200).json(exUser);
  } catch (error) {
    next(error);
  }
});

//회원가입
Router.post("/", async (req, res, next) => {
  try {
    const {
      userName: reqUserName,
      email: reqEmail,
      password: reqPassword,
      confirmPassword: reqConfirmPassword
    } = checkProps(
      req.body,
      "userName",
      "email",
      "password",
      "confirmPassword"
    );
    if (reqPassword !== reqConfirmPassword) {
      const error = new Error("비밀번호 체크값이 같지 않음");
      error.status = 400;
      throw error;
    }
    const exUser = await UserModel.findOne({ where: { email: reqEmail } });
    if (exUser) {
      const error = new Error("이미 가입된 이메일");
      error.status = 400;
      throw error;
    }
    const salt = await generateRandomString(ENCRYPT_BUFF, ENCODE_TYPE);
    const cryptoPass = await encryptString(reqPassword, salt);
    const result = await UserModel.create({
      userName: reqUserName,
      email: reqEmail,
      cryptoPass,
      salt
    });
    if (result) {
      res.status(201).json({
        success: true
      });
    } else {
      throw new Error("가입실패");
    }
  } catch (error) {
    next(error);
  }
});

//회원정보 수정
Router.put("/", async (req, res, next) => {
  try {
    const {
      id: reqId,
      userName: reqUserName,
      password: reqPassword,
      confirmPassword: reqConfirmPassword
    } = checkProps(req.body, "id", "userName", "password", "confirmPassword");

    const salt = await generateRandomString(ENCRYPT_BUFF, ENCODE_TYPE);
    const cryptoPass = await encryptString(reqPassword, salt);
    const sucess = UserModel.update(
      {
        reqUserName,
        cryptoPass,
        salt
      },
      { where: { id: reqId } }
    );
    res.status(200).json(sucess);
  } catch (error) {
    next(error);
  }
});

//탈퇴
Router.delete("/", async (req, res, next) => {
  try {
    const { id: reqId } = checkProps(req.body, "id");
    const sucess = UserModel.destroy({
      where: { reqId }
    });
    res.status(204).json(sucess);
  } catch (error) {
    next(error);
  }
});

module.exports = Router;
