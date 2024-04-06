package repository

import (
	_ "github.com/tsuji-kota/MemoSys/backend/schema"
	"log"
)

func UpDate(user_id string, id string, progress string) error {

	_, err := db.Exec("UPDATE bills SET progress = ? WHERE user_id =  ? AND id = ?",  progress, user_id, id )
	if err != nil {
		log.Fatalf("failed to send data to the db: %v", err)

	}
	return err
}
