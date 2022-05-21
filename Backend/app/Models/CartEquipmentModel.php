<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class CartEquipmentModel extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'cart_eq';

    protected $primaryKey = 'ceid';

    public $timestamps = false;

    protected $fillable = [
        'ceid',
        'eid',
        'cid',
        'date_start',
        'date_end',
        'duration',
        'price',
    ];

}
