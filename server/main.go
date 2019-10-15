package main

import (
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type Users struct {
	ID        uint   `gorm:"primary_key" json:"id"`
	Firstname string `gorm:"not null" json:"firstname"`
	Lastname  string `gorm:"not null" json:"lastname"`
}

var db = InitDb()

func InitDb() *gorm.DB {
	db, err := gorm.Open("postgres", "host=postgres port=5432 dbname=public user=root sslmode=disable")
	db.LogMode(true)

	checkErr(err, "ERORR: on initDB")

	if !db.HasTable(&Users{}) {
		db.CreateTable(&Users{})
		db.Set("gorm:table_options", "ENGINE=InnoDB").CreateTable(&Users{})
	}

	return db
}

func PostUser(c *gin.Context) {
	var user Users
	c.Bind(&user)

	if user.Firstname != "" && user.Lastname != "" {
		db.Create(&user)
		c.JSON(201, gin.H{"data": user})
	} else {
		c.JSON(422, gin.H{"error": "Fields are empty"})
	}
}

func GetUsers(c *gin.Context) {
	var users []Users

	db.Find(&users)

	c.JSON(200, gin.H{"data": users})
}

func GetUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user Users

	db.First(&user, id)

	if user.ID != 0 {
		c.JSON(200, gin.H{"data": user})
	} else {
		c.JSON(404, gin.H{"error": "User not found"})
	}
}

func UpdateUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user Users

	db.First(&user, id)

	if user.Firstname != "" && user.Lastname != "" {

		if user.ID != 0 {
			var newUser Users
			c.Bind(&newUser)

			result := Users{
				ID:        user.ID,
				Firstname: newUser.Firstname,
				Lastname:  newUser.Lastname,
			}

			db.Save(&result)

			c.JSON(200, gin.H{"data": result})
		} else {
			c.JSON(404, gin.H{"error": "User not found"})
		}
	} else {
		c.JSON(422, gin.H{"error": "Fields are empty"})
	}
}

func DeleteUser(c *gin.Context) {
	id := c.Params.ByName("id")
	var user Users
	db.First(&user, id)

	if user.ID != 0 {
		db.Delete(&user)
		c.JSON(200, gin.H{"data": "User #" + id + " deleted"})
	} else {
		c.JSON(404, gin.H{"error": "User not found"})
	}
}

func main() {
	routes := gin.Default()
	routes.Use(cors.Default())
	v1 := routes.Group("api/v1")
	{
		v1.POST("/users", PostUser)
		v1.GET("/users", GetUsers)
		v1.GET("/users/:id", GetUser)
		v1.PUT("/users/:id", UpdateUser)
		v1.DELETE("/users/:id", DeleteUser)
	}

	routes.Run(":8080")
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Fatalln(msg, err)
	}
}
