<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CartModel extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'cart';

    protected $primaryKey = 'cid';

    public $timestamps = false;

    protected $fillable = [
        'cid',
        'id',
        'date_order',
        'status',
    ];

}
