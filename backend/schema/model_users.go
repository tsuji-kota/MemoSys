package schema

type Users struct {
	ID      	int `json:"id"`
	UserId		string `json:"user_id"`
	Password	string `json:"password"`
}