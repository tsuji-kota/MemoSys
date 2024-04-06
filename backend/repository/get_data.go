package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	_ "golang.org/x/crypto/bcrypt"
	"log"
)


func GetData(fkUser_id string) ([]schema.Issues, error) {

	var issues []schema.Issues
	

	rows, err := db.Query("SELECT b.id, b.image_name, b.issued_month, b.progress, c.charge, p.plan FROM bills b LEFT JOIN charges c ON b.id = c.bill_id LEFT JOIN plans p ON b.id = p.bill_id WHERE b.user_id = ?", fkUser_id)

	
	defer rows.Close()
	if err != nil {
		log.Printf("can't get Database : %v", err)
	}
	for rows.Next() {
		var issue schema.Issues
		err := rows.Scan(&issue.Id, &issue.ImageName, &issue.IssuedMonth, &issue.Progress,  &issue.Charge, &issue.Plan); 
		if err != nil {
			log.Printf("can't get Database : %v", err)
		}
		issues = append(issues, issue)
	}
	if err = rows.Err(); err != nil {
        log.Fatal(err)
    }

	return issues, err
}