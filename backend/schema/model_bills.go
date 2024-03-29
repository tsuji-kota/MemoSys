packege schema

type bills struct {
	ID      	string `json:"id"`
	UserId		string `json:"user_id"`
	ImageName	string `json:"image_name"`
	IssuedMonth string `json:"issued_month"`
	IssueAt		string `json:"issue_at"`
}