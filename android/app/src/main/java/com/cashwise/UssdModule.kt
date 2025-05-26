package com.cashwise

import android.content.Intent
import android.net.Uri
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class UssdModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "UssdModule"
    }

    @ReactMethod
    fun dialUssdCode(ussdCode: String) {
        val encodedHash = Uri.encode("#")
        val uri = "tel:" + ussdCode.replace("#", encodedHash)
        val intent = Intent(Intent.ACTION_CALL)
        intent.data = Uri.parse(uri)
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
        reactApplicationContext.startActivity(intent)
    }
}
