<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_that_true_is_true()
    {
        $this->assertTrue(true);
    }
    public function testAuth()
    {
        $response = $this->post('/login', [
            'email' => 'admin@gmail.com',
            'password' => 'admin password'
        ]);
        $response = $this->get('admin/test');
        dd($response->status());
    }
}
