import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AnnotationSchemas } from '../utils/AnnotationSchemas';
import {SVGUtils} from '../utils/SVGUtils'
@Component({
  selector: 'schema-table',
  templateUrl: './schema-table.component.html',
  styleUrls: ['./schema-table.component.css']
})
export class SchemaTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {}

  public static populateSchemasTable(annotationSchemas: AnnotationSchemas){
    //get the table with schemas
    const schema_table = d3.select("#schemas-table");

    //populate table
    var rows = schema_table.select("tbody").selectAll("tr").
          data(annotationSchemas.getSchemasObjectArray()).enter().append("tr");
     
    var cells = rows.selectAll("td").data(function(row) {
      return ["schema","color"].map(function(column){
          return {column: column, value: row[column]};
      });
    }).enter().append("td")
    .attr("class", d => {
      if(String(d.value).includes("."))
        return "td-schema";
      else
        return "td-color";
    })
    .attr("style", d => {
      if(String(d.value).includes("."))
        return "background-color:#FFFFFF";
      else
        return "background-color:"+d.value;
    })
    .text(d => {if(d.value.includes(".")) return d.value; else return "";});
    
    //column for total annotations of each schema
    rows.append("td").text(function(d,i){
		return annotationSchemas.schemasTotalAnnotations.get(annotationSchemas.getSchemasObjectArray()[i].schema)
    });
    //column with checkboxes
    rows.append("input").property('checked',true)
       .attr('type','checkbox')
       .attr("id",function(d,i){   return annotationSchemas.getSchemasObjectArray()[i].schema})
       .on("click",function(d){
	console.log(d3.select("system-view").attr("hidden"),d3.select("package-view").attr("hidden"),d3.select("class-view").attr("hidden"))
        SVGUtils.hideCircles(".svg-container-pv",this.id,this.checked);
       	
	});
        
	



    }
}
