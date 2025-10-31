package com.ayush.canteen_food_api.Service;

import java.util.List;

import com.ayush.canteen_food_api.dto.Item;

public interface ItemService {
    Item addItem(Item item);

    List<Item> getAllItems();

    List<Item> getItemByCategory(String category);
}
