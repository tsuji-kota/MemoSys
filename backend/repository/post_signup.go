package repository

import (
	"backend/schema"
	"fmt"
	"golang.org/x/crypto/bcrypt"
)

func PostLogin(user schema.users) {
	hashdPassword := bcrypt.GenerateFormPassWord(user.Password)
	_, err = db.Exec("INSERT INTO users (id,user_id) VALUES (?,?)", user.UserId, hasdPassword)

	//TODO
	//同じユーザーIDが存在する場合はエラーを返す処理を実行
	//空の場合もエラーを返す処理を実行（フロントで実装したい）
	return err
}
