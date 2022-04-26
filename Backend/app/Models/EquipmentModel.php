<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class EquipmentModel extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'equipment';

    protected $primaryKey = 'eid';

    public $timestamps = true;

    protected $fillable = [
        'eid',
        'title',
        'location',
        'description',
        'image',
    ];
}
