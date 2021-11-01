from elasticsearch_dsl import analyzer, tokenizer
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from . import models

'''
./manage.py search_index --rebuild

Sample usage:

q = CodeKey33.search().query('match', code = "000").to_queryset()
from elasticsearch_dsl import Q
q = CodeKey33.search().query( Q( 'match', meaning = "end") | Q( 'prefix', code = '010-'))
q = CodeKey33.search().query( Q( 'match', meaning = "end") | Q( 'prefix', code = dict( value = '010-', boost = 20) ))

pagination:
 use slicing: q[ 10:20]
 or to access all: for hit in q.scan()
'''

from elasticsearch_dsl import analyzer, tokenizer

nGram_analyzer = analyzer('ngram_analyzer',
    tokenizer=tokenizer('trigram', 'ngram', min_gram=3, max_gram=3),
    filter=['lowercase']
    )

#use keyword analizer

@registry.register_document
class CodeKey33(Document):
    class Index:
        # Name of the Elasticsearch index
        name = 'vmrs_ck33'
        # See Elasticsearch Indices API reference for available settings
        settings = {
            #'number_of_shards': 1,
            #'number_of_replicas': 0
            }

    code = fields.TextField(
        analyzer = analyzer('keyword'),
        fields = { 'raw': fields.KeywordField() }
        )
    description = fields.TextField( analyzer = nGram_analyzer)
    meaning     = fields.TextField( analyzer = nGram_analyzer)
    class Django:
        model = models.CodeKey33 # The model associated with this Document

        # The fields of the model you want to be indexed in Elasticsearch
        #fields = [
        #    #'code',
        #    'meaning',
        #    'description',
        #    ]

        # Ignore auto updating of Elasticsearch when a model is saved
        # or deleted:
        # ignore_signals = True

        # Don't perform an index refresh after every update (overrides global setting):
        # auto_refresh = False

        # Paginate the django queryset used to populate the index with the specified size
        # (by default it uses the database driver's default setting)
        # queryset_pagination = 5000
