package com.ayush.canteen_food_api.dto;

public class Item {
    private long id;
    private String name;
    private float price;
    private float rating;
    private String image;
    private String category;

    public Item(){

    }

    public Item(long id , String name, float price, float rating, String image , String category) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.image = image;
        this.category = category;
    }

    public long getId(){
        return id;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        return "Items{" +
                "name='" + name + '\'' +
                ", price=" + price +
                ", rating=" + rating +
                ", image='" + image +
                ", category=" + category +'\'' +
                '}';
    }
}
