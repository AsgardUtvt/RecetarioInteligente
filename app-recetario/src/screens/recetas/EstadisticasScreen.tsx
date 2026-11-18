import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { apiAsgardJessica } from '../../api/apiAsgardJessica';

const { width } = Dimensions.get('window');

export const EstadisticasScreen = () => {
  const [populares, setPopulares] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [resPop, resCat] = await Promise.all([
          apiAsgardJessica.get('/recetas/estadisticas/populares'),
          apiAsgardJessica.get('/recetas/estadisticas/categorias'),
        ]);
        setPopulares(resPop.data);
        setCategorias(resCat.data);
      } catch (e) {
        console.log('Error cargando estadísticas:', e);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#D2691E" style={{ flex: 1 }} />;
  }

  const maxCat = Math.max(...categorias.map((c: any) => parseInt(c.cantidad)), 1);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Top recetas */}
      <View style={styles.headerBlock}>
        <Text style={styles.sectionTitle}>Top 5 Recetas Más Guardadas</Text>
        <Text style={styles.sectionSubtitle}>Las favoritas de la comunidad</Text>
      </View>

      {populares.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyEmoji}>🍽️</Text>
          <Text style={styles.emptyText}>Aún no hay recetas guardadas.</Text>
          <Text style={styles.emptySubtext}>¡Agrega tu primera favorita!</Text>
        </View>
      ) : (
        populares.map((item, index) => (
          <View key={item.idMeal} style={styles.statRow}>
            <View style={[styles.rankBadge, index === 0 && styles.rankFirst]}>
              <Text style={[styles.rankText, index === 0 && styles.rankFirstText]}>
                #{index + 1}
              </Text>
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statName} numberOfLines={1}>{item.strMeal}</Text>
              <Text style={styles.statCount}>
                {item.cantidad} {parseInt(item.cantidad) === 1 ? 'guardada' : 'guardadas'}
              </Text>
            </View>
            <Text style={styles.medal}>{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '⭐'}</Text>
          </View>
        ))
      )}

      {/* Categorías */}
      <View style={[styles.headerBlock, { marginTop: 30 }]}>
        <Text style={styles.sectionTitle}>Distribución por Categoría</Text>
        <Text style={styles.sectionSubtitle}>Qué tipo de cocina prefieres</Text>
      </View>

      {categorias.map((cat: any) => {
        const porcentaje = (parseInt(cat.cantidad) / maxCat) * 100;
        return (
          <View key={cat.categoria} style={styles.barContainer}>
            <View style={styles.barLabel}>
              <Text style={styles.barText}>{cat.categoria || 'Sin categoría'}</Text>
              <Text style={styles.barCount}>{cat.cantidad}</Text>
            </View>
            <View style={styles.barBackground}>
              <View style={[styles.barFill, { width: `${porcentaje}%` }]} />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF8F0' },
  headerBlock: { marginBottom: 15 },
  emoji: { fontSize: 32, marginBottom: 4 },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D2691E',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#8B4513',
    marginTop: 4,
    fontStyle: 'italic',
  },
  emptyBox: {
    backgroundColor: '#FAEBD7',
    borderRadius: 16,
    padding: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyEmoji: { fontSize: 50, marginBottom: 10 },
  emptyText: { fontSize: 16, color: '#8B4513', fontWeight: '600' },
  emptySubtext: { fontSize: 14, color: '#B8A89A', marginTop: 4 },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  rankBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FAEBD7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankFirst: { backgroundColor: '#D2691E' },
  rankText: { fontSize: 16, fontWeight: 'bold', color: '#D2691E' },
  rankFirstText: { color: '#FFFFFF' },
  statInfo: { flex: 1 },
  statName: { fontSize: 16, fontWeight: 'bold', color: '#2C1810' },
  statCount: { fontSize: 13, color: '#8B4513', marginTop: 3 },
  medal: { fontSize: 24 },
  barContainer: { marginBottom: 18 },
  barLabel: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  barText: { fontSize: 15, color: '#2C1810', fontWeight: '600' },
  barCount: { fontSize: 15, color: '#D2691E', fontWeight: 'bold' },
  barBackground: { height: 14, backgroundColor: '#FAEBD7', borderRadius: 7, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: '#D2691E', borderRadius: 7 },
});
