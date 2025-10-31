package com.ayush.canteen_food_api.Service;

import com.ayush.canteen_food_api.Entity.ItemEntity;
import com.ayush.canteen_food_api.Repository.ItemRepository;
import com.ayush.canteen_food_api.dto.Item;

import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements ItemService{

    private ItemRepository itemRepository;

    public ItemServiceImpl(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    @Override
    public Item addItem(Item item) {
        ItemEntity itemEntity= new ItemEntity();
        BeanUtils.copyProperties(item , itemEntity);
        itemRepository.save(itemEntity);
        return item;
    }

    @Override
    public List<Item> getAllItems() {
        List<ItemEntity> itemEntities= itemRepository.findAll();

        List<Item> items = itemEntities
                .stream()
                .map(itm -> new Item(itm.getId()
                , itm.getName(),
                        itm.getPrice(),
                        itm.getRating(),
                        itm.getImage(),
                        itm.getCategory()))
                .collect(Collectors.toList());
        return items;
    }

    @Override
    public List<Item> getItemByCategory(String category) {
        List<ItemEntity> itemEntities= itemRepository.findByCategory(category);

        List<Item> items = itemEntities
                .stream()
                .map(itm -> new Item(itm.getId()
                        , itm.getName(),
                        itm.getPrice(),
                        itm.getRating(),
                        itm.getImage(),
                        itm.getCategory()))
                .collect(Collectors.toList());
        return items;
    }
}
