from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import filters, generics
from core.models import Pessoa
from core.serializers.pessoa import PessoaSerializer
from core.services.pessoa import PessoaService

class PessoaViewSet(viewsets.ViewSet):
    def create(self, request):
        serializer = PessoaSerializer(data=request.data)
        if serializer.is_valid():
            PessoaService().create_person(serializer.validated_data)
            return Response({'status': 'Pessoa criada com sucesso'}, status=201)
        else:
            return Response(serializer.errors, status=400)

    def update(self, request, pk=None):
        serializer = PessoaSerializer(instance=Pessoa.objects.get(pk=pk), data=request.data)
        if serializer.is_valid():
            PessoaService().change_person(pk, serializer.validated_data)
            return Response({'status': 'Pessoa atualizada com sucesso'})
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        PessoaService().delete_person(pk)
        return Response({'status': 'Pessoa excluída com sucesso'})

    def retrieve(self, request, pk=None):
        pessoa = PessoaService().get_person(pk)
        serializer = PessoaSerializer(pessoa)
        return Response(serializer.data)


class PessoaListView(generics.ListAPIView):
    queryset = PessoaService().list_person()
    serializer_class = PessoaSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["nome", "dt_nascimento", "cpf"]
