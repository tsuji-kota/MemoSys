package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	_ "golang.org/x/crypto/bcrypt"
	_ "log"
)

func GetUserslist() ( []schema.Users,error) {
	var userList []schema.Users


	rows, err := db.Query("SELECT id, user_id FROM users")

	defer rows.Close()

	for rows.Next(){
		var user schema.Users
		err = rows.Scan(&user.ID, &user.UserId)
		userList = append(userList, user)
	}

	return userList, err
}
