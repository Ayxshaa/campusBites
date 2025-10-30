package com.ayush.canteen_food_api.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ayush.canteen_food_api.Model.Item;
import com.ayush.canteen_food_api.Service.ItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping("/items")
    public Item addItem(@RequestBody Item item) {
        return itemService.addItem(item);
    }

    @GetMapping("/items")
    public List<Item> getAllItems(){
        return itemService.getAllItems();
    }

    @GetMapping("/category/{category}")
    public List<Item> getItemByCategory(@PathVariable String category){
        return itemService.getItemByCategory(category);
    }
}
