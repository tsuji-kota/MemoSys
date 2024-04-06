package main

import (
	"github.com/tsuji-kota/MemoSys/backend/repository"
	"github.com/tsuji-kota/MemoSys/backend/schema"
	"github.com/gin-gonic/gin"
	"github.com/gin-contrib/cors"
	"net/http"
    "log"
	_ "strconv"
	"fmt"
)

func main() {
	router := gin.Default()

	setCors(router)
	//TODO
	//ログアウト機能を作って，セッションを削除する

	router.POST("/login", postLogin)
	router.POST("/signup", postSignup)
	router.POST("/issue", postIssue)
	router.POST("/getdata", getData)
	router.POST("/update", upDate)
	router.POST("/getusers", getUsers)
	router.POST("/admin", getAdminData)
    
    srv := http.Server{
        Addr:    ":3000",
        Handler: router,
    }
    err := srv.ListenAndServe()
    if err != nil {
        log.Fatalf("server run error: %v", err)
    }
}

func setCors(router *gin.Engine) {
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:4000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type"},
		AllowCredentials: true,

	}))
}

func getAdminData(cxt *gin.Context){
	log.Printf("getAdminDataのエンドポイントに来てる")

	plan := cxt.PostForm("plan")
	month := cxt.PostForm("month")
	id := cxt.PostForm("user_id")
	log.Printf("issues data: %v %v %v", id,plan,month)

	
	issues, err :=repository.GetAdminData(id,plan,month)

	log.Printf("issues data: %s", fmt.Sprintf("%v", issues))
	
	if err != nil {
				
		log.Printf("err : %v", err)
		cxt.JSON(http.StatusBadRequest, gin.H{
			//400
			"message": "getdata faild",
		})

	} else {
				//200
				cxt.JSON(http.StatusOK, issues)
				log.Printf("get data success!^^")
		
	}
}
func getUsers(cxt *gin.Context){
	log.Printf("getusersのエンドポイントに来てる")

	userlist,err :=repository.GetUserslist()
	
	if err != nil {
				
		log.Printf("err : %v", err)
		cxt.JSON(http.StatusBadRequest, gin.H{
			//400
			"message": "update faild",
		})

	} else {
				//200
				cxt.JSON(http.StatusOK, userlist)
				log.Printf("update success!^^")
		
	}

}
// postAlbumsはリクエストボディのJSONからアルバムを追加します
func postSignup(cxt *gin.Context) {
	var user schema.Users
    log.Printf("一応ここまできてる")
	// 受け取ったJSONを`newAlbum`にバインドするために`BindJSON`を呼び出す
	if err := cxt.BindJSON(&user); err != nil {
        return
	}
	log.Printf("バインドできた")
    
	//DBに登録する処理を書く
	err := repository.PostSignup(user)
    log.Printf("DBにかけた")
	if err == nil {
		cxt.JSON(http.StatusOK, gin.H{
			"message": "singup success",
		})
	} else {
		cxt.JSON(http.StatusBadRequest, gin.H{
			//400
			"message": "singup faild",
		})
	}

}

// postAlbumsはリクエストボディのJSONからアルバムを追加します
func postLogin(cxt *gin.Context) {
	var user schema.Users

	// 受け取ったJSONを`newAlbum`にバインドするために`BindJSON`を呼び出す
	if err := cxt.BindJSON(&user); err != nil {
		return
	}

	//DBに登録する処理を書く
	err,id := repository.PostLogin(user)
	name := user.UserId

	log.Println("ユーザーネームこれ？：",name)

	
		if err == nil {
			cxt.JSON(http.StatusOK, gin.H{
				"id": id,
				"name": name,
			})
		} else {
			log.Printf("パスワード間違えてるて")
			cxt.JSON(http.StatusUnauthorized, gin.H{
				//401
				"message": "login faild",
			})
		}
	log.Println("セッションに値を設定します。")
	
	
	if err != nil {
		log.Printf("セッションの保存中にエラーが発生しました: %v", err)
		// エラー処理
	}
}

func postIssue(cxt *gin.Context) {
	log.Printf("issueのエンドポイントに来てる")
	
	file, err := cxt.FormFile("file")
	plan := cxt.PostForm("plan")
	charge := cxt.PostForm("charge")
	month := cxt.PostForm("month")
	progress := cxt.PostForm("progress")
	id := cxt.PostForm("id")
	log.Printf("formから中身を取り出す")
	if err != nil {
		//401
		cxt.JSON(http.StatusUnauthorized, gin.H{
			//401
			"message": "login faild",
		})
		log.Fatalf("ファイルを受け取れてない")
	}
	//ファイル単体の処理
	gcpPath,err := repository.PostGCS(cxt, file)
	if err != nil {	
		//401
		cxt.JSON(http.StatusUnauthorized,gin.H{
			//401
			"message": "login faild",
		})
		log.Fatalf("gcsに送信できてない")
	}
	log.Printf("gcsに送信できた")




	//ファイルのURL+その他をDBに登録する処理を書く
	err = repository.PostIssue(gcpPath, plan, charge, month, progress, id)
	if err == nil {
		cxt.JSON(http.StatusOK, gin.H{
			"message": "issue success",
		})
	} else {
		cxt.JSON(http.StatusBadRequest, gin.H{
			//400
			"message": "issue faild",
		})
	}

}
func getData(cxt *gin.Context){
	log.Printf("getDataのエンドポイントに来てる")
	id := cxt.PostForm("id")

	issues, err :=repository.GetData(id)

	log.Printf("issues data: %s", fmt.Sprintf("%v", issues))
	
	if err != nil {
				
		log.Printf("err : %v", err)
		cxt.JSON(http.StatusBadRequest, gin.H{
			//400
			"message": "getdata faild",
		})

	} else {
				//200
				cxt.JSON(http.StatusOK, issues)
				log.Printf("get data success!^^")
		
	}

}

func upDate(cxt *gin.Context){
	log.Printf("updateのエンドポイントに来てる")
	progress := cxt.PostForm("up_progress")	
	id := cxt.PostForm("up_id")
	user_id := cxt.PostForm("user_id")

	err :=repository.UpDate(user_id, id, progress)
	
	if err != nil {
				
		log.Printf("err : %v", err)
		cxt.JSON(http.StatusBadRequest, gin.H{
			//400
			"message": "update faild",
		})

	} else {
				//200
				cxt.JSON(http.StatusOK, gin.H{
					//400
					"message": "update success!^^",
				})
				log.Printf("update success!^^")
		
	}

}