var {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLFloat,
	GraphQLBoolean
} = require('graphql');

var {getPlaceInfo} = require('../../../API/flickrAPI');

const flickrPlaceType = module.exports = new GraphQLObjectType({
	name:'flickrPlace',
	description:'Return a list of place IDs for a query string.',
	fields: ()=>({
		place_id:		{type:GraphQLString},
		woeid:			{type:GraphQLString},
		latitude:		{type:GraphQLFloat},
		longitude:		{type:GraphQLFloat},
		place_url:		{type:GraphQLString},
		place_type:		{type:GraphQLInt},
		timezone:		{type:GraphQLString},
		_content:		{type:GraphQLString},
		woe_name:		{type:GraphQLString},
		
		/*---------------------nested------------------*/
		placeInfo:		{type:flickrPlaceInfoType,
							resolve:({place_id})=>getPlaceInfo(place_id)},
	})
});

const flickrPlaceInfoType = new GraphQLObjectType({
	name:'flickrPlaceInfo',
	description:'Get informations about a place.',
	fields: ()=>({
		neighbourhood:{type:flickrPlaceType},
		continent:	{type:flickrPlaceType},
		locality:	{type:flickrPlaceType},
		county:		{type:flickrPlaceType},
		region:		{type:flickrPlaceType},
		country:	{type:flickrPlaceType},
		shapefile:	{type:GraphQLString,
						resolve:({shapedata})=>{
							//console.log(shapedata.urls)
							return shapedata.urls.shapefile._content}},
	})
});