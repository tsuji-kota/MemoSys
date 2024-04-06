

package repository

import (
	"log"
	_ "fmt"
)

func PostIssue(gcpPath string, plan string, charge string, month string, progress string, fkUser_id string) error {
	var bill_id int64

	log.Printf("gcpPath: %v plan: %v charge: %v month: %v FKuser_id %v", gcpPath, plan, charge, month,fkUser_id)

	result, err := db.Exec("INSERT INTO bills (user_id,image_name,issued_month,progress) VALUES (?,?,?,?)", fkUser_id, gcpPath, month, progress)
	if err != nil {
		log.Fatalf("failed to send data to the db: %v", err)
	}
	bill_id, err = result.LastInsertId() 
	if err != nil {
		log.Fatalf("resultからIDの取得ができていない")
	}

	_, err = db.Exec("INSERT INTO plans (bill_id, plan) VALUES (?, ?)", bill_id, plan)
	if err != nil {
		log.Fatalf("failed to send data to the db: %v", err)
	}
	_, err = db.Exec("INSERT INTO charges (bill_id, charge) VALUES (?, ?)", bill_id, charge)
	if err != nil {
		log.Fatalf("failed to send data to the db: %v", err)
	}

	return err
}
