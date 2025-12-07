import React, { useState } from 'react'
import { Plus, Tag, IndianRupee, Star, Image as ImageIcon, FolderOpen, Check, Trash2 } from 'lucide-react'
import ItemsService from '../services/ItemsService'
import { useNavigate } from 'react-router'

const Admin = () => {
  
    const itemsService = new ItemsService();
    
    const [item, setItem] = useState({
        id:"",
        name: "",
        price: "",
        rating: "",
         image: "",
         category: ""
    })

    const navigate = useNavigate()

    const saveMenu = (e) => {
    e.preventDefault();
    itemsService.createItem(item)
        .then((response) => {
            console.log(response)
            navigate("/menu")
        })
        .catch((error)=>{
            console.log(error)
        });
}

    const reset = (event) => {
        event.preventDefault();
        setItem({
            id:"",
        name: "",
        price: "",
        rating: "",
         image: "",
         category: ""
        })
    } 

    const handleChange = (e) => {
        const value = e.target.value;
        setItem({...item,[e.target.name]:value})
    }

    return (
        <div className="w-full max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border-2 border-orange-200/50 overflow-hidden hover:shadow-md transition-all duration-200">
                
                {/* Header Section */}
                <div className="bg-orange-500/10 border-b-2 border-orange-200/50 px-6 py-5">
                    <h1 className="text-xl font-bold text-gray-800 flex items-center">
                        <div className="w-9 h-9 bg-orange-500/10 rounded-xl flex items-center justify-center mr-3 border-2 border-orange-300">
                            <Plus className="w-5 h-5 text-orange-600" />
                        </div>
                        Add New Item
                    </h1>
                    <p className="text-gray-500 mt-1 text-sm ml-12">Create a new food item for your menu</p>
                </div>

                {/* Form Section */}
                <div className='px-6 py-6 space-y-4'>
                    
                    {/* Name Field */}
                    <div className='space-y-1.5'>
                        <label className='flex items-center text-gray-700 font-medium text-sm'>
                            <Tag className="w-4 h-4 text-orange-500/70 mr-2" />
                            Name of Food Item
                        </label>
                        <input 
                            type="text" 
                            name="name"
                            value={item.name}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter food item name"
                            className='w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Price Field */}
                    <div className='space-y-1.5'>
                        <label className='flex items-center text-gray-700 font-medium text-sm'>
                            <IndianRupee className="w-4 h-4 text-orange-500/70 mr-2" />
                            Price
                        </label>
                        <input 
                            type="text" 
                            name='price'
                            value={item.price}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter price (e.g., ₹12.99)"
                            className='w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Rating Field */}
                    <div className='space-y-1.5'>
                        <label className='flex items-center text-gray-700 font-medium text-sm'>
                            <Star className="w-4 h-4 text-orange-500/70 mr-2" />
                            Rating
                        </label>
                        <input 
                            type="text" 
                            name='rating'
                            value={item.rating}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter rating (1-5)"
                            className='w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Image Field */}
                    <div className='space-y-1.5'>
                        <label className='flex items-center text-gray-700 font-medium text-sm'>
                            <ImageIcon className="w-4 h-4 text-orange-500/70 mr-2" />
                            Image URL
                        </label>
                        <input 
                            type="text" 
                            name='image'
                            value={item.image}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter image URL"
                            className='w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Category Field */}
                    <div className='space-y-1.5'>
                        <label className='flex items-center text-gray-700 font-medium text-sm'>
                            <FolderOpen className="w-4 h-4 text-orange-500/70 mr-2" />
                            Category
                        </label>
                        <input 
                            type="text" 
                            name='category'
                            value={item.category}
                            onChange={(e) => handleChange(e)}
                            placeholder="Enter category (e.g., Snacks, Lunch, etc)"
                            className='w-full h-11 border-2 border-gray-200 rounded-lg px-4 py-2.5 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 bg-white transition-all duration-200 text-sm'
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className='flex gap-3 pt-4'>
                        <button 
                            onClick={saveMenu} 
                            className='flex-1 bg-orange-500/10 border-2 border-orange-300 text-orange-600 font-medium py-2.5 px-6 rounded-lg hover:bg-orange-500/20 hover:border-orange-400 transition-all duration-200 flex items-center justify-center text-sm shadow-sm hover:shadow-md'>
                            <Check className="w-4 h-4 mr-2" />
                            Save Item
                        </button>
                        <button 
                            onClick={reset}
                            className='flex-1 bg-white border-2 border-gray-200 text-gray-600 font-medium py-2.5 px-6 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center text-sm shadow-sm hover:shadow-md'>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Clear Form
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Admin