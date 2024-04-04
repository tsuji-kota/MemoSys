package repository

import(
	"cloud.google.com/go/storage"
	"google.golang.org/api/option"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"io"
	"mime/multipart"
	"time"
	_"context"
    "fmt"
    "os"
	"log"
)

func PostGCS(ctx *gin.Context, file *multipart.FileHeader) (string, error) {
	log.Printf("PostGCSに来てる")
	credentialsFile := "/go/src/backend/repository/memosys_gcskey.json"
	err := godotenv.Load(".env")
	cwd, _ := os.Getwd()
	log.Printf("Current working directory: %s", cwd)
	if err != nil {
		log.Fatalf("Error loading .env file")
	}


	client, err := storage.NewClient(ctx, option.WithCredentialsFile(credentialsFile))
	if err != nil {
		log.Fatalf("error creating client : %w", err)
	}
	log.Printf("クライアントを作成した")

	bucket := client.Bucket("memosys-bucket")
	log.Printf("バケットを作成したが，まだ中身は入れてない")

	currentTime := time.Now()
	gcsFileName := fmt.Sprintf("%s.png", currentTime.Format("20060102150405"))
	src, err := file.Open()
	log.Printf("入れるデータを作成した")

	if err != nil {
		log.Fatalf("error opening file : %w", err)
	}
	defer src.Close()
	obj := bucket.Object(gcsFileName)

	wc := obj.NewWriter(ctx)
	if _, err = io.Copy(wc, src); err != nil {
		log.Fatalf("error writing file : %w", err)
	}
	if err = wc.Close(); err != nil {
		log.Fatalf("error closing file : %w", err)
	}

	resImagePath := fmt.Sprintf("https://storage.googleapis.com/%s/%s", "memosys-bucket", gcsFileName) 
	return resImagePath, nil
}

