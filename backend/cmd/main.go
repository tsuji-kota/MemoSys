package main

import (
	"backend/repository"
	"backend/schema"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func main() {
	router := gin.Default()
	router.POST("/login", postLogin)
	router.POST("/singup", postSingup)

	router.Run("localhost:8080")
}

// postAlbumsはリクエストボディのJSONからアルバムを追加します
func postSingup(cxt *gin.Context) {
	var user schema.users

	// 受け取ったJSONを`newAlbum`にバインドするために`BindJSON`を呼び出す
	if err := c.BindJSON(&user); err != nil {
		return
	}

	//DBに登録する処理を書く
	err := repository.PostSingup(user)

	if err != nil {
		cxt.JSON(http.StatusOK, gin.H{
			"message": "singup success",
		})
	} else {
		cxt.JSON(http.BadRequest, gin.H{
			//400
			"message": "singup faild",
		})
	}

}

// postAlbumsはリクエストボディのJSONからアルバムを追加します
func postLogin(cxt *gin.Context) {
	var user schema.users

	// 受け取ったJSONを`newAlbum`にバインドするために`BindJSON`を呼び出す
	if err := c.BindJSON(&user); err != nil {
		return
	}

	//DBに登録する処理を書く
	err := repository.PostLogin(user)

	if err != nil {
		cxt.JSON(http.StatusOK, gin.H{
			"message": "login success",
		})
	} else {
		cxt.JSON(http.StatusUnauthorized, gin.H{
			//401
			"message": "login faild",
		})
	}
}
