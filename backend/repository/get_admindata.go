package repository

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	_ "golang.org/x/crypto/bcrypt"
	"log"
	"strings"
)


func GetAdminData(id string,plan string,month string) ([]schema.Issues, error) {

	var issues []schema.Issues

	var conditions []string
	var params []interface{}

	baseQuery := `SELECT b.id, b.image_name, b.issued_month, b.progress, u.user_id, c.charge, p.plan
					FROM bills b
					LEFT JOIN users u ON b.user_id = u.id
					LEFT JOIN charges c ON b.id = c.bill_id
					LEFT JOIN plans p ON b.id = p.bill_id`

	
	if id != "all" {
		conditions = append(conditions, "u.id = ?")
		params = append(params, id) 
	}
	
	if plan != "all" {
		conditions = append(conditions, "p.plan = ?")
		params = append(params, plan)
	}
	
	if month != "all" {
		conditions = append(conditions, "b.issued_month = ?")
		params = append(params, month)
	}
	
	if len(conditions) > 0 {
		baseQuery += " WHERE " + strings.Join(conditions, " AND ")
	}
	
	rows, err := db.Query(baseQuery, params...)
	if err != nil {
		log.Printf("can't get Database : %v", err)
	}
	defer rows.Close()

	if err != nil {
		log.Printf("can't get Database : %v", err)
	}
	for rows.Next() {
		var issue schema.Issues//b.id, b.image_name, b.issued_month,  b.progress, u.user_id, c.charge, p.plan
		err := rows.Scan(&issue.Id, &issue.ImageName, &issue.IssuedMonth, &issue.Progress, &issue.UserId, &issue.Charge, &issue.Plan)
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