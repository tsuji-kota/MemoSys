package repository

import (
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
	"backend/schema"
)

func PostSingup(user schema.users) {
	var hashedPassword string

	if err :=db.QueryRow("SELECT password FROM users WHERE user_id = ?", user.UserId).Scan(&hashedPassword)
	//TODO
	//空の場合にエラーを返す処理を実行（フロントで実装したい）
	err := bcrypt.CompareHashAndPassword(hashed, password)
	
	return err
	
} 