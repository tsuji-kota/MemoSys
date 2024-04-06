package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	_ "golang.org/x/crypto/bcrypt"
	"log"
)


func GetData(fkUser_id string) (schema.Bills, error) {
	var bills schema.Bills
	var charges schema.Charges
	var plans schema.Plans

	err := db.QueryRow("SELECT id,image_name,issued_month FROM bills WHERE user_id = ?", fkUser_id).Scan(&bills.Id ,&bills.ImageName, &bills.IssuedMonth)
	err = db.QueryRow("SELECT charge FROM charges WHERE bill_id = ?", bills.Id).Scan(&charges.Charge)
	err = db.QueryRow("SELECT plan FROM plans WHERE bill_id = ?", bills.Id).Scan(&plans.Plan)
	
	if err != nil {
		log.Printf("can't get Database : %v", err)
	}

	return bills, err
}