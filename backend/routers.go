

func main(){
	router := gin .Default()
	router.GET("/login", func(c *gin.Context){
		c.JSON(200, gin.H{
			"message": "login",
		})
	})
}