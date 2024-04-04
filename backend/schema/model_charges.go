package schema

type Charges struct {
	ID       string `json:"id"`
	BillId   string `json:"bill_id"`
	Charge   string `json:"charge"`
}
