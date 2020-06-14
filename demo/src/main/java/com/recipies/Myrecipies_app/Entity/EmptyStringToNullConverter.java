package com.recipies.Myrecipies_app.Entity;

 

import javax.persistence.AttributeConverter;

import javax.persistence.Converter;

 

import org.springframework.util.StringUtils;

 

//@Converter(autoApply = true)

public class EmptyStringToNullConverter implements AttributeConverter<String, String> {

 

    @Override

    public String convertToDatabaseColumn(String string) {

        // Use defaultIfEmpty to preserve Strings consisting only of whitespaces

       // return StringUtils.defaultIfBlank(string, null);

                return "";

    }

 

    @Override

    public String convertToEntityAttribute(String dbData) {

        //If you want to keep it null otherwise transform to empty String

        return dbData;

    }

}

